import {useEffect, useState} from "react";
export default function App() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('products.json');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    const filter = (event) => {
        event.preventDefault();
    }
    const filteredProducts = products.filter(product => {
        return (category === "All" || product.type === category) &&
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    return (
        <>
            <header>
                <h1>The Can Store</h1>
            </header>
            <div>
                <aside>
                    <form onSubmit={filter}>
                        <div>
                            <label htmlFor="category">Choose a category:</label>
                            <select id="category" onChange={e => setCategory(e.target.value)}>
                                <option value="All">All</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="meat">Meat</option>
                                <option value="soup">Soup</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="searchTerm">Enter search term:</label>
                            <input type="text" id="searchTerm" placeholder="e.g. beans" onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                        <div>
                            <button>Filter results</button>
                        </div>
                    </form>
                </aside>
                <main>
                    {filteredProducts.map(product => (
                        <section className={product.type} key={product.name}>
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                            <img src={product.image} alt={product.name}/>
                        </section>
                    ))}
                </main>
            </div>
            <footer>
                <p>All icons found at the Noun Project:</p>
                <ul>
                    <li>
                        Bean can icon by{" "}
                        <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
                    </li>
                    <li>
                        Vegetable icon by{" "}
                        <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
                    </li>
                    <li>
                        Soup icon by{" "}
                        <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
                    </li>
                    <li>
                        Meat Chunk icon by{" "}
                        <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
                    </li>
                </ul>
            </footer>
        </>
    );
}