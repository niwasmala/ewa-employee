import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: employee } = await supabase
    .from('ewa_employee')
    .select('id, name')
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

  const { data: withdrawal } = await supabase
    .from('ewa_withdrawal')
    .select('id, amount, reason, status, created_at')
    .eq('salary_id', salary?.id)
    .eq('employee_id', employee.id)
    .order('created_at', { ascending: false })

  return { session, employee, salary, withdrawal }
}

export const actions = {
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (session) {
      await supabase.auth.signOut()
      throw redirect(303, '/')
    }
  },
}
