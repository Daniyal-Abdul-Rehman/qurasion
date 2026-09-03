import PropertyDetailPage, { generateStaticParams } from '../../../property/[slug]/page';

export { generateStaticParams };

export default async function InvestorPropertyRoute({ params }: { params: Promise<{ slug: string }> }) {
	return <PropertyDetailPage params={params} />;
}
