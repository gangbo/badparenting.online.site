import {getSEOTags} from "@/lib/seo"
import Script from 'next/script'
import FullscreenIframe from "./FullscreenIframe";
import {getTranslations} from "next-intl/server";
import Image from "next/image";

export const runtime = "edge";

export const generateMetadata = async () => {
    const t = await getTranslations('home.Metadata');
    return await getSEOTags({
        title: t('title'),
        path: "/",
        description: t('description'),
         keywords: t.raw('keywords').join(','),
    })
}

export default async function Home() {
    const t = await getTranslations('home');

    return (
        <div className="space-y-6 text-gray-300">
            <Script
                id="bad-parenting-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoGame",
                        "name": t('Metadata.title'),
                        "description": t('Metadata.description'),
                        "genre": ["Horror", "Adventure"],
                        "playMode": "SinglePlayer",
                        "applicationCategory": "Browser Game",
                        "inLanguage": ["zh-CN", "en", "ja", "pt"]
                    })
                }}
            />
            <section className="text-center">
                <h1 className="text-3xl font-bold mb-2 text-red-600">{t('hero.title')}</h1>
                <p className="mb-4">{t('hero.subtitle')}</p>
            </section>

            <section id="play" className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="pb-2">{t('version2Title')}</h2>
                <FullscreenIframe
                    thumbnailSrc="/static/v2.jpg"
                    src="https://play.unity.com/api/v1/struckd/app?game=bad-parings-struckd-version&unity=unity"
                    title={t('Metadata.title')}
                />
            </section>

            <section id="play" className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="pb-2">{t('version1Title')}</h2>
                <FullscreenIframe
                    thumbnailSrc="/static/badp.jpg"
                    src="/static/bad-parenting/index.html"
                    title={t('Metadata.title')}
                />
            </section>

            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">{t('gameFeatures.title')}</h2>
                <ul className="list-disc list-inside space-y-2">
                    {t.raw('gameFeatures.features').map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </section>

            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">{t('storyBackground.title')}</h2>
                <p>{t('storyBackground.content1')}</p>
                <p className="mt-4">{t('storyBackground.content2')}</p>
            </section>

            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">{t('gameControls.title')}</h2>
                <ul className="list-disc list-inside space-y-2">
                    {t.raw('gameControls.controls').map((control: string, index: number) => (
                        <li key={index}>{control}</li>
                    ))}
                </ul>
            </section>

            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">{t('screenshots.title')}</h2>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-[640px]">
                        <Image src="/static/bap1.jpg"
                               width={640}
                               height={360}
                               alt={`${t('Metadata.title')} 游戏截图`}
                               className="w-full h-auto"
                               loading={'lazy'}
                        />
                    </div>
                    <div className="w-full max-w-[640px]">
                        <Image src="/static/bap2.jpg"
                               width={640}
                               height={360}
                               alt={`${t('Metadata.title')} 游戏截图`}
                               className="w-full h-auto"
                               loading={'lazy'}
                        />
                    </div>
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">{t('callToAction.title')}</h2>
                <a href="/#play"
                   className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300">
                    {t('callToAction.button')}
                </a>
            </section>

            {/*<section className="bg-gray-800 p-8 rounded-xl shadow-lg text-center">*/}
            {/*    <h2 className="text-2xl font-semibold mb-4 text-red-600">{t('community.title')}</h2>*/}
            {/*    <p className="mb-4">{t('community.description')}</p>*/}
            {/*    <a href="https://discord.gg/xUmgKxjD7c" target="_blank" rel="noopener noreferrer"*/}
            {/*       className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">*/}
            {/*        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>*/}
            {/*        <span>{t('community.button')}</span>*/}
            {/*    </a>*/}
            {/*</section>*/}
        </div>
    );
}