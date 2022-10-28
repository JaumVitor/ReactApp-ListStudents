import React, { useEffect, useState } from 'react'

// Importando componentes 
import { Card } from '../../Components/Card'

import '../../Styles/global.css'
import '../../Styles/home.css'

export function Home() {
  // Hook state, para alterar variavel em tempo real
  const [ studentName, setStudentName ] = useState('')
  const [ students, setStudents ] = useState([])
  const [ user, setUser ] = useState({ name: '', avatar: ''})

  function handleAddStudent() {
    // studentName sera enviado para o novo objeto, quando apertar button
    const newStudent = {
      name: studentName, 
      time: new Date().toLocaleString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) 
    }
    
    // State substitue todo conteudo
    // Logo preciso pegar o array antigo e adicionar com o novo.
    setStudents( prevState => [...prevState, newStudent])
    setStudentName('')
  }

  useEffect(() => {
    async function fetchData () {
      const response = await fetch('http://api.github.com/users/JaumVitor')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [])

  return (
    // onChange captura envento toda vez que existe mudança
    <div className="container">
      <header>
        <h1>Name: {studentName} </h1>
        <div className='perfil-user'>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        value={studentName}
        placeholder='Digite seu nome'
        onChange={ e => setStudentName(e.target.value)}  
      />

      {/* Adicionando student na lista */}
      <button
        type='button'
        onClick={e => handleAddStudent(e)}>Adicionar
      </button>

      {/* Pecorrendo lista de students */}
      {
        students.length != 0 ? 
        students.map( (student, index) => {
          return (
            <Card 
              key={index}
              name={student.name} 
              time={student.time}
            />
          )
        }) : <p className='is-empty'> Não existe alunos cadastrados </p>
      }
    </div>
  )
}
