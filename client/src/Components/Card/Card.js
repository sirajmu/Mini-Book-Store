const Card = ({ title, author, image }) => {
    const imageUrl = image ? (image.startsWith("http") ? image : `/images/${image}`) : "/images/default.jpg";

    return (
        <div className="card shadow-lg rounded-lg overflow-hidden" style={{ width: "18rem", margin: "1rem auto" }}>
            <img 
                src={imageUrl} 
                alt={title} 
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }} // Ensures images fit nicely
            />
            <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-secondary">{author}</p>
            </div>
        </div>
    );
};

export default Card;

  
  

  