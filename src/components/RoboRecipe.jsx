import ReactMarkdown from 'https://esm.sh/react-markdown@7'
export default function RoboRecipe(props) {
    return (
        <section className='suggested-recipe-container'>
        <h2>Chef Charles Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}