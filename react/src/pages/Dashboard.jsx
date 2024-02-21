import axios from "axios"
import { useEffect, useState } from "react";
import CardImage from "../components/CardImage";
import Loader from "../components/Loader";

export default function Dashboard() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const getArticles = async () => {
        setLoading(true);
        const response = await axios.get('https://newsapi.org/v2/everything?q=Engineering&from=2023-01-03&sortBy=publishedAt&apiKey=7e07dd603bf6469088e79fde3077573d')
        if(response) {
            setLoading(false);
            setArticles(response.data.articles);
        }
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <div>
            {!loading ? (
                <ul class="grid w-full gap-6 md:grid-cols-4">
                    {articles &&  articles.length > 0 ? articles.map((at, index) => (
                        <li>
                            <CardImage key={index} imageLink={at.urlToImage} title={at.title} titleLink={at.url} description={at.description}/>
                        </li>
                    )) : (
                        <h1> No Articles </h1>
                    )}
                </ul>
            ) : (
                <div className="card">
                    <div className='flex align-items-center'>
                        <span className='mr-2'>
                        Loading...
                        </span>
                        <Loader
                            loading={loading}
                            color="#0D9488"
                        />
                    </div>
                </div>
            )}

        </div>
    )

}
  