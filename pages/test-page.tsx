import { useIndexQuery } from '../src/graphql/types';
import { gql } from '@apollo/client';
import Todo from '../src/components/test-todo';
import { useState, ChangeEvent, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

gql`
  query Index {
    allTodos {
      todoId
    }
  }
`;

const TestPage = () => {
  const [session, sessionLoading] = useSession();

  const { data, loading } = useIndexQuery();
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [todoIds, setTodoIds] = useState<string[]>();

  const fillTodoIds = (data: string[]) => {
    setTodoIds(data?.slice().sort((a, b) => a.localeCompare(b)));
  };

  useEffect(() => {
    fillTodoIds(data?.allTodos?.map(t => t.todoId));
  }, [data?.allTodos]);

  const updateTodoDescription = (e: ChangeEvent) => {
    setNewTodoDescription((e.target as HTMLInputElement).value.toString());
  };

  const onClickAddTodo = () => {};

  const todoElements = todoIds?.map(id => <Todo todoId={id} key={id} />);

  const body =
    loading || typeof todoElements === 'undefined' ? null : todoElements.length > 0 ? (
      <>
        <table>
          <tbody>{todoElements}</tbody>
        </table>
      </>
    ) : (
      <div>No ToDos!</div>
    );

  return (
    <>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTodoDescription}
        onChange={updateTodoDescription}
      ></input>
      <button type="button" onClick={onClickAddTodo}>
        Add
      </button>
      {body}

      <p>
        {' '}
        User details
        {sessionLoading && <span>Loading auth status</span>}
        {!session && (
          <>
            <span>You are not signed in</span>
            <a
              href={`/api/auth/signin`}
              onClick={e => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            <span
              style={{
                height: '200px',
                width: '200px',
                backgroundImage: `url(${session.user.image})`,
              }}
            />
            <span>
              <small>Signed in as</small>
              <br />
              <strong>
                Email is {session.user.email} Name is {session.user.name} Object is{' '}
                {JSON.stringify(session)}
              </strong>
            </span>
            <a
              href={`/api/auth/signout`}
              onClick={e => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </p>
    </>
  );
};

export default TestPage;
