import React from 'react'

const ButtonSave = (handleSubmit, isLoading, selectedType) => {
    
    return (
        <button
            className="bg-rose text-white px-4 py-2 rounded-lg hover:bg-purple transition"
            onClick={handleSubmit}
            disabled={!selectedType || !selectedLabel}
        >
            {isLoading ? 'Ajout...' : 'Done'}
        </button>
    )
}

export default ButtonSave