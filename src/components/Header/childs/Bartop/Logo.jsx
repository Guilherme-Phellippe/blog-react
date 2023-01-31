import './logo.css'

export const Logo = () => {

    return (
        <div className="content-logo" onClick={() => window.location.href = "/"}>
            <img src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
        </div>
    )
}