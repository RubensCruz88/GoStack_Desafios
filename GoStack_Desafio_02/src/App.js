import React from "react";

import "./styles.css";
import api from './services/api';
import { useState, useEffect } from "react";

function App() {
	const [repositories,setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then(response => setRepositories(response.data));
	},[])

	async function handleAddRepository() {
		const response = await api.post('repositories',{
			title: `Novo repositorio ${Date.now()}`,
			url: "http://github.com",
			techs: [
				'React',
				"NodeJS"
			]
		})

		const repository = response.data;

		setRepositories([...repositories,repository]);
  	}

  async function handleRemoveRepository(id) {
	const response = await api.delete(`repositories/${id}`)

	if (response.status == 204){
		const repositoryIndex = repositories.findIndex(repository => repository.id === id)

		if (repositoryIndex != -1){
			repositories.splice(repositoryIndex,1);

			setRepositories([...repositories]);
		}
	}
  }

  return (
    <div>
      <ul data-testid="repository-list">
	  {repositories.map(repository => {
				return (<li key={repository.id}>
					{repository.title}
					<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
				</li>
					)
			})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
