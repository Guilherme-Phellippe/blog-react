export default function SiteMapFeeds() {
    return (
        `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns: xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns: news="http://www.google.com/schemas/sitemap-news/0.9" xsi: schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

            <url>
                <loc>https://temsabor.blog/receitas/receita-de-queijadinha</loc>
                <news:news>
                    <news:publication>
                        <news:name>Tem sabor Receitas</news:name>
                        <news:language>pt</news:language>
                    </news:publication>
                    <news:publication_date>2023-07-24T09:38:39+00:00</news:publication_date>
                    <news:title>
                        < ![CDATA[RECEITA DE QUEIJADINHA]]>
                    </news:title>
                    <news:keywords>
                        < ![CDATA[Queijadinha, fácil, rápida]] >
                    </news:keywords>
                </news:news>
                <priority>1.0</priority>
                <lastmod>2023-07-24T09:38:39+00:00</lastmod>
            </url>

        </urlset>
        `
    )
}