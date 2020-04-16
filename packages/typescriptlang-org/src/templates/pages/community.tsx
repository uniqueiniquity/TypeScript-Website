import * as React from "react"
import { Layout } from "../../components/layout"
import { Intl } from "../../components/Intl"
import { graphql } from "gatsby"
import { CommunityPageQuery } from "../../__generated__/gatsby-types"
import { createInternational } from "../../lib/createInternational"
import { useIntl } from "react-intl"

import meetups from "../../../../community-meta/generated/meetups.json"

import "./css/community.scss"
import { comCopy } from "../../copy/en/community"

const conferences =
  [
    {
      title: "TSConf:EU",
      location: "Linz",
      url: "https://tsconf.eu",
      date: "March 31st, 2020",
      country: "Austria",
      logo: require("../../assets/community/conferences/tsconf-eu-2020-logo.png"),
      headline: require("../../assets/community/conferences/tsconf-eu-2020-logo.png"),
      bio: "TSConf:EU 2020 is the first conference for the TypeScript community. Join us for an unforgettable day in the heart of Europe!",
    }
  ]


const QuarterOrHalfRow = (props: { children: any, className?: string }) => <div className={[props.className, "split-row"].join(" ")}>{props.children}</div>
const Row = (props: { children: any, className?: string }) => <div className={[props.className, "row"].join(" ")}>{props.children}</div>
const Col = (props: { children: any, className?: string }) => <div className={[props.className, "col1"].join(" ")}>{props.children}</div>
const Col2 = (props: { children: any, className?: string }) => <div className={[props.className, "col2"].join(" ")}>{props.children}</div>


type Props = {
  data: CommunityPageQuery
  pageContext: any
}

export const Comm: React.FC<Props> = props => {
  const intl = useIntl()
  const i = createInternational<typeof comCopy>(intl)

  // Make an array of all the meetups which share a rough location
  const meetupByArea = {}
  meetups.forEach(meetup => {
    const area = meetup.meetup.continentish
    if (meetupByArea[area]) {
      meetupByArea[area].push(meetup.meetup)
    } else {
      meetupByArea[area] = [meetup.meetup]
    }
  });

  return (
    <Layout title={i("com_layout_title")} description={i("com_layout_description")} lang={props.pageContext.lang} allSitePage={props.data.allSitePage}>
      <div className="raised main-content-block container community" style={{ marginTop: "80px" }}>
        <Row>
          <Col className="sidebar">
            <h2>{i("com_connect_online")}</h2>
            <p className="banner-text">{i("com_connect_online_description")}</p>
          </Col>

          <Col2 className="callouts">
            <div className="callout">
              <a aria-labelledby="stack-header" className="icon stackoverflow img-circle" href="https://stackoverflow.com/questions/tagged/typescript" target="_blank"></a>
              <div className="text">
                <a href="https://stackoverflow.com/questions/tagged/typescript" id="stack-header" target="_blank">
                  <h3 className="community-callout-headline">Stack Overflow</h3>
                </a>
                {i("com_online_stack_overflow_desc")}{" "}
                <a href="https://stackoverflow.com/questions/tagged/typescript" target="_blank">Stack Overflow</a>{" "}
                {i("com_online_stack_overflow_tag")} <b>typescript.</b>
              </div>
            </div>

            <div className="callout">
              <a aria-labelledby="discord-header" className="icon discord img-circle" href="https://discord.gg/typescript" />

              <div className="text">
                <a href="https://discord.gg/typescript" id="discord-header">
                  <h3 className="community-callout-headline">{i("com_online_discord_header")}</h3>
                </a>
                {i("com_online_discord_desc")}</div>
            </div>
            <div className="callout">
              <a aria-labelledby="github-header" className="icon bug img-circle" href="https://github.com/microsoft/TypeScript/issues/new/choose" target="_blank" />
              <div className="text">
                <a href="https://github.com/microsoft/TypeScript/issues/new/choose" id="github-header">
                  <h3 className="community-callout-headline">GitHub</h3>
                </a>
                {i("com_online_github_desc")}{" "}
                <a href="https://github.com/microsoft/TypeScript/issues/new/choose">{i("com_online_github_href")}</a>
              </div>
            </div>
            <div className="callout">
              <a aria-labelledby="twitter-header" className="icon twitter img-circle" href="https://twitter.com/typescript" target="_blank" />
              <div className="text">
                <a href="https://twitter.com/typescript" id="twitter-header" target="_blank">
                  <h3 className="community-callout-headline">Twitter</h3>
                </a>
                {i("com_online_twitter_desc") + " "}
                <a href="https://twitter.com/typescript" target="_blank">@typescript</a>!
            </div>
            </div>
            <div className="callout">
              <a aria-labelledby="blog-header" className="icon blog img-circle" href="https://devblogs.microsoft.com/typescript/" target="_blank" />
              <div className="text">
                <a href="https://devblogs.microsoft.com/typescript/" id="blog-header" target="_blank">
                  <h3 className="community-callout-headline">Blog</h3>
                </a>
                {i("com_online_blog_desc") + " "}
                <a href="https://devblogs.microsoft.com/typescript/" target="_blank">blog</a>!
            </div>
            </div>
            <div className="callout">
              <a aria-labelledby="deftyped-header" className="icon definitelytyped img-circle" href="https://github.com/definitelytyped/definitelytyped/#definitelytyped" target="_blank" />
              <div className="text">
                <a href="https://github.com/definitelytyped/definitelytyped/#definitelytyped" id="deftyped-header" target="_blank">
                  <h3 className="community-callout-headline">Definitely Typed</h3>
                </a>
                {i("com_online_typed_desc")}{" "}
                <a href="https://github.com/definitelytyped/definitelytyped/#definitelytyped" target="_blank">{i("com_online_typed_href")}</a>{" "}
                {i("com_online_typed_available_for")}
              </div>
            </div>
          </Col2>
        </Row>
      </div>

      <div className="container community centered">
        <h2>{i("com_person")}</h2>

        <div className="sub-nav" style={{ display: "none" }}>
          <button >Conferences</button>
          <button>Upcoming Events</button>
          <button>Meetups</button>
        </div>
      </div>

      <div className="raised main-content-block container community" style={{ display: "none" }}>
        <Row>
          <Col2>
            <h3>{i("com_conferences")}</h3>
            <div className="callouts">
              <div className="row">
                {conferences.map(conference => (
                  <div className="callout">
                    <a href={conference.url} rel="noopener" target="blank">
                      <img src={conference.logo} className="icon img-square" alt={`${i("com_conferences_alt_img")} ` + conference.title} />
                    </a>
                    <a href={conference.url}><h4 className="community-callout-headline">{conference.title}</h4></a>
                    <div className="text">
                      {conference.location} {conference.country}
                      <br />
                      <time>{conference.date}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col2>

          <Col className="sidebar">
            <h2>Conferences</h2>
            <p className="banner-text">Hello</p>
          </Col>
        </Row>
      </div>


      <div className="raised main-content-block container community">
        <h3 className="centered-highlight">Upcoming Events</h3>
        <div className="events">
          <Row>
            {meetups
              .filter(m => m.event)
              .sort((l, r) => new Date(l.event!.date).getTime() - new Date(r.event!.date).getTime())
              .map(m => (
                <div className="col1 upcoming-event">
                  <h4>{m.meetup.title}</h4>
                  <h4>{intl.formatDate(m.event!.date)}</h4>
                  <div className="event-info">
                    <div className="meetup-text">
                      <div dangerouslySetInnerHTML={{ __html: m.event!.richDescription }} />
                    </div>
                    <div className="meetup-gradient" />
                  </div>
                </div>
              ))}
          </Row>
        </div>
      </div>


      <div className="raised main-content-block container community">
        <h3 className="centered-highlight">Meetups</h3>
        <div className="events">
          {Object.keys(meetupByArea)
            .map(area => (
              <>
                <h4>{area}</h4>
                <div className="callouts">
                  {meetupByArea[area].map(meetup => (
                    <Col className="callout">
                      <img src={require("../../assets/community/meetup-logos/" + meetup.image)} className="icon img-square" alt={"logo of " + meetup.title} />
                      <div>
                        <h4 className="community-callout-headline">{meetup.title}</h4>
                        <div className="text">{meetup.country}<br /><a rel="noopener" target="blank" href={meetup.url}>Website</a>{meetup.twitter ? <a rel="noopener" target="blank" href={meetup.twitter}>Twitter</a> : null}</div>
                      </div>
                    </Col>
                  ))}
                </div>
              </>
            ))}
        </div>
      </div>
    </Layout >
  )
}

export default (props: Props) => (
  <Intl locale={props.pageContext.lang}>
    <Comm {...props} />
  </Intl>
)

export const query = graphql`
  query CommunityPage {
    ...AllSitePage
  }
`
