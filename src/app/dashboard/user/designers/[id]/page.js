import { DesignerProfile } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Designer Profile',
};

export default function DesignerProfilePage({ params }) {
  const { id } = params;

  return <DesignerProfile id={id} />;
}
