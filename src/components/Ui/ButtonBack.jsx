import React from 'react'

const ButtonBack = () => {
    return (
        <button
            className="bg-rose text-white px-3 py-1 rounded hover:bg-purple transition"
            onClick={() => window.history.back()}
        >
            ← Retour
        </button>
    )
}

export default ButtonBack