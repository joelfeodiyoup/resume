import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

const content: {title: React.ReactNode, content: React.ReactNode}[] = [
  {title: "personal background", content: <>
    <p>I'm a passionate full-stack web developer, with many ideas.</p>
    <p>I grew up in the Australian wilderness. As a teenager I worked on fruit farms, as a checkout chick, and in potato chip factories stacking boxes and driving forklifts. Somewhere in there I studied jazz guitar. Later I studied mathematics and computer science, majoring in pure and applied mathematics. I was a maths/IT teacher in London for a while, (attempting to) inspire young minds, before deciding to play to my strengths, and in 2016-17 I taught myself web dev. I now have almost 10 years of experience and I continue to find new excitement in this career, for which I feel very lucky. In 2023 I moved to Munich, Germany, and feel like I've found my home.</p>
  </>},
  {title: "interests", content: <>
    <p>I firmly believe that life is for living. I take pride in working hard and competently, and then making the most of my personal time.</p>
    <p>Here are a few things I'm interested in:</p>
    <ul>
      <li>cycling - I once spent 2-3 months cycling from Calais, France, to Vienna, Austria. These days, I enjoy riding and sleeping in forests with my hammock on warm nights.</li>
      <li>running - I once completed a 58km ultramarathon</li>
      <li>jazz guitar - in 2007 I studied jazz guitar at a conservatory. I've kept up the interest, reading about jazz music theory, styles, etc</li>
      <li>juggling - sometime last year I wondered if I could learn how to juggle. It turns out that almost anyone can</li>
      <li>reading - I personally see a lot of value in continually reading. I usually have 10-25 books in my 'current' collection in my Kindle. Some topics I like are fiction/science fiction classics, history, etc</li>
      <li>drawing - I picked up this hobby again as an adult</li>
    </ul>
  </>}
]

function RouteComponent() {
  return content.map((c, i) => (
    <div key={`content-${i}`}>
      <h2>{c.title}</h2>
      <div>{c.content}</div>
    </div>
  ))
}
