import Link from 'next/link';
import Layout from '../Layout/layout';
import fetch from 'isomorphic-unfetch';

const PostLink  = (props) => {
  const {id, name, url} = props.show;
  return (
    <li>
      <Link as={`/post/${id}`} href={`/post?id=${id}`}>
        <a>{name}</a>
      </Link>
      <style jsx>{`

        li {
          list-style: none;
          margin: 5px 0;
        }
        a {
          text-decoration: none;
          color: #dedede;
          font-family: "Arial";
          transition: all .35s;
        }
        a:hover {
          opacity: .9;
        }
      `}</style>      
    </li>    
  )
};


const Index = (props) => {

  return (
    <Layout>
      <h1>My blog</h1>
      <ul>
        {props.shows.map( item => <PostLink key={item.show.id} {...item} />)}
      </ul>
      <style jsx>{`
        h1 {
          font-family: "Arial";
        } 

        ul {
          padding: 0;
        }
      `}</style>
    </Layout>
  );
}
    


Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  console.log(`show data fetched. Count: ${data.length}` );
  return {
    shows:  data
  }
}

export default Index
