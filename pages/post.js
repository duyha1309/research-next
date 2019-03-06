import {withRouter} from 'next/router';
import Layout from '../Layout/layout';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';

const Content =(props) => { 
    // console.log('props',props);
    return (
        <div>
            <h1>{props.show.name}</h1>
            <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
            <img src={props.show.image.medium} />
            <div className="markdown">
                <Markdown source={`
                    This is our blog post.
                    Yes. We can have a [link](/link).
                    And we can have a title as well.

                    ### This is a title

                    And here's the content.                
                `} />
            </div>
            <style jsx global>{`
                .markdown {
                    font-family: 'Arial'
                }

                .markdown a {
                    text-decoration: none;
                    color: blue;
                }

                .markdown a:hover {
                    opacity: .6;
                }

                .markdown h3 {
                    margin: 0;
                    padding: 0;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    )
};

// const Content = props => 
const Page = props => (
    <Layout>
        <Content {...props} />
    </Layout>
)

Page.getInitialProps = async function (context) {
    
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();
    console.log( 'get initial', show);
    return { show };
}

export default Page;