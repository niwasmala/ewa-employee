import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: employee } = await supabase
    .from('ewa_employee')
    .select('id, name, company_id')
    .eq('user_id', session.user.id)
    .single()

  const now = new Date().toISOString()

  const { data: salary } = await supabase
    .from('ewa_salary')
    .select('id, salary_active, salary_hold, salary_pending, salary_withdrawn, salary_total, start_date, end_date')
    .eq('employee_id', employee.id)
    .lte('start_date', now)
    .gte('end_date', now)
    .single()

  return { session, employee, salary }
}

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()
    const now = new Date().toISOString()

    if (!session) {
      return fail(500, { message: 'Session not found. Please login.', success: false })
    }

    const { data: employee } = await supabase
      .from('ewa_employee')
      .select('id, name, company_id')
      .eq('user_id', session.user.id)
      .single()

    if (!employee) {
      return fail(500, { message: 'Employee not found.', success: false })
    }

    const { data: salary } = await supabase
      .from('ewa_salary')
      .select('id, salary_active, salary_hold, salary_pending, salary_withdrawn, salary_total, start_date, end_date')
      .eq('employee_id', employee.id)
      .lte('start_date', now)
      .gte('end_date', now)
      .single()

    if (!salary) {
      return fail(500, { message: 'Salary not found.', success: false })
    }

    const formData = await request.formData()
    const amount = formData.get('amount') as number
    const reason = formData.get('reason') as string

    if (!amount) {
      return fail(500, { message: 'Amount not valid.', success: false })
    }
    if (!reason) {
      return fail(500, { message: 'Reason not valid.', success: false })
    }
    if (amount > salary.salary_active) {
      return fail(500, { message: `Amount must not greater than ${salary.salary_active}.`, success: false })
    }

    const { error } = await supabase
      .from('ewa_withdrawal')
      .insert({ 
        employee_id: employee.id, 
        company_id: employee.company_id, 
        salary_id: salary.id,
        amount,
        reason,
      })

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false })
    }

    throw redirect(303, '/')
  },
}
