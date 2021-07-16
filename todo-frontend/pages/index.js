import { getSession, signIn, signOut } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const IndexPage = ({ session }) => {

  const [todos, setTodos] = useState([]);
  useEffect(async () => {
    if(session!=null){
      const result = await axios.get("http://localhost:1337/todos?user="+session.user.name);
      setTodos(result?.data);
    }

  }, []);

  const addTodo = async (todoText) => {
    if (todoText && todoText.length > 0) {
      const result = await axios.post("http://localhost:1337/todos/", {
        todoText: todoText,
        private: false,
        user: session.user.name
      });
      setTodos([...todos, result?.data]);
    }
  };
  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("http://localhost:1337/todos/" + todo.id);
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };


  const makePublic = async (todo) => {
    
    const result = await axios.put("http://localhost:1337/todos/" + todo.id, {
        private: false
      });
  };


  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new note");
    if (newTodoText != null) {
      const result = await axios.put("http://localhost:1337/todos/" + todo.id, {
        todoText: newTodoText,
        private: true
      });
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return result?.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

 
  
  const signInButtonNode = () => {
    if (session) {

      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
	          <button className="logiInPos"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button className="logoutLblPos"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  if (!session) {
    return (
      <div >
        <div>
          <h1 className="initial">MARKNOTE</h1>
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
        <div class="ins">Please Sign in to view your Notes</div>
      </div>
    );
  }



  return (
    <div className="hero">
      <Head>
        <title>MarkNote</title>
      </Head>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text"></div>
      <div className="text">{session.user.name}</div>

      
      <div>
      <Head>
        <title>Marknote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>


    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};




export default IndexPage;