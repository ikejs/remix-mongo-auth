import { logout } from '~/utils/auth.server';

export const loader = async ({ request }) => logout(request);
