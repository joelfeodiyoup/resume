import { Thumbnails } from '#/components/thumbnails/Thumbnails'
import { createFileRoute } from '@tanstack/react-router'
import { imagesByKeys } from './about.images.ts'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

const content: { title: React.ReactNode; content: React.ReactNode }[] = [
  {
    title: 'professional background',
    content: (
      <>
        <p>
          I've been a full stack developer for nearly 10 years. See the other
          sections for more my professional experience. Read on for some more
          general context of who I am.
        </p>
      </>
    ),
  },
  {
    title: 'personal background',
    content: (
      <>
        <p>
          I grew up in the Australian wilderness. As a teenager I worked on
          fruit farms, as a checkout chick, and in potato chip factories
          stacking boxes and driving forklifts. Somewhere in there I studied
          jazz guitar. Later I studied mathematics and computer science,
          majoring in pure and applied mathematics. I was a maths/IT teacher in
          London for a while, (attempting to) inspire young minds, before
          deciding to play to my strengths, and in 2016-17 I taught myself web
          dev. I now have almost 10 years of experience and I continue to find
          new excitement in this career, for which I feel very lucky. In 2023 I
          moved to Munich, Germany, and feel like I've found my home.
        </p>
      </>
    ),
  },
  {
    title: 'interests',
    content: (
      <>
        <p>Here are a few things I'm interested in.</p>

        <p>
          Though this site is primarily about my professional skills, living a
          life outside of work, being interested in a variety of things, and
          working with others who feel the same, is something I feel is quite
          important.
        </p>
        <ul>
          <li>
            <strong>cycling</strong> - I once spent 2-3 months cycling from
            Calais, France, to Vienna, Austria. I have also cycled across parts
            of Japan. These days, I enjoy riding and sleeping in forests with my
            hammock on warm nights.
            <br />
            <Thumbnails
              imgs={imagesByKeys([
                'cycling_france',
                'cycling_hammock',
                'cycling_japan',
                'cycling_dunwich',
              ])}
            />
          </li>
          <li>
            <strong>running</strong> - I try to run regularly, and once
            completed a 58km ultramarathon. I've attended the Saturday 5km
            parkrun over 250 times, since 2015.
            <br />
            <Thumbnails imgs={imagesByKeys(['strava_five_peaks'])} />
          </li>
          <li>
            <strong>jazz guitar</strong> - in 2007 I studied jazz guitar at a
            conservatory. I've kept up the interest, reading about jazz music
            theory, styles, etc
            <br />
            <Thumbnails imgs={imagesByKeys(['jazz_guitar', 'synthesiser'])} />
          </li>

          <li>
            <strong>hiking</strong> - a major motivation for me moving to Munich
            was to be close to the alps. I try to hike there regularly,
            discovering different hiking routes mainly via public transport,
            covering my strava heatmap.
            <br />
            <Thumbnails
              imgs={imagesByKeys([
                'strava_heatmap',
                'hike_sunset',
                'hiking_in_snow',
              ])}
            />
          </li>
          <li>
            <strong>juggling</strong> - sometime last year I wondered if I could
            learn how to juggle. It turns out that almost anyone can
          </li>
          <li>
            <strong>reading</strong> - I personally see a lot of value in
            continually reading. I usually have 10-25 books in my 'current'
            collection in my Kindle. Some topics I like are fiction/science
            fiction classics, history, etc
            <br />
            <Thumbnails imgs={imagesByKeys(['bookshelf'])} />
          </li>
          <li>
            <strong>drawing</strong> - I picked up this hobby again as an adult
            <br />
            <Thumbnails imgs={imagesByKeys(['drawing', 'drawing_02'])} />
          </li>
        </ul>
      </>
    ),
  },
]

function RouteComponent() {
  return content.map((c, i) => (
    <div key={`content-${i}`}>
      <h2>{c.title}</h2>
      <div>{c.content}</div>
    </div>
  ))
}
