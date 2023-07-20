import { useEffect, useState } from "react";
import { useStories } from "../../../hooks/useApi"
import { Img } from "../../atoms/Img"

export default function WebStoriesPreview() {
    const storiesApi = useStories();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        (async () => {
            const storiesData = await storiesApi.getAllStories();
            setStories(storiesData.data)
        })()
    })


    return (
        <div className="flex gap-6 p-8 w-full bg-white overflow-x-auto ">
            {
                stories.map(story =>
                    <a key={story.id} href={`https://temsabor.blog/stories?slug=${story.slug}`}>
                        <div className="w-[12rem] flex flex-col items-center gap-4">
                            <div className="w-[8rem] h-[8rem] rounded-full overflow-hidden cursor-pointer opacity-80 hover:opacity-100 border-[3px] border-blue-600">
                                <Img imgs={story.story_poster_portrait_src} alt={`Essa é imagem representa: ${story.story_title}`} />
                            </div>
                            <p className="text-center text-s1_2 md:text-s1 font-medium">{story.story_title}</p>
                        </div>
                    </a>
                )
            }
        </div>
    )
}