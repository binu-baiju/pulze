// "use client";
// import { Button, Header, Heading } from "ui";

// // import { getClient } from "../lib/client";

// import { gql, useMutation } from "@apollo/client";
// import { useState } from "react";

// const query = gql`
//   query ExampleQuery {
//     books {
//       title
//     }
//   }
// `;

// const CREATE_BOOK = gql`
//   mutation CreateBook($title: String!, $author: String!) {
//     createBook(title: $title, author: $author) {
//       id
//       title
//       author
//     }
//   }
// `;

// export const revalidate = 5;

// export default async function Page() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");

//   const [createBook] = useMutation(CREATE_BOOK);

//   const handleCreateBook = async () => {
//     try {
//       const { data } = await createBook({
//         variables: { title, author },
//       });
//       console.log("New book created:", data.createBook);
//       // Optionally, you can navigate to a different page or update the UI here.
//     } catch (error) {
//       console.error("Error creating book:", error);
//     }
//   };

//   // const { data } = await getClient().query({ query });

//   return (
//     <>
//       <Header text="Web" />
//       <Button>shadcn button</Button>
//       <Heading />
//       {/* <h1>{data.books[1].title}</h1> */}
//       <div>
//         <h2>Create a New Book</h2>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Author:</label>
//           <input
//             type="text"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//         </div>
//         <button onClick={handleCreateBook}>Create Book</button>
//       </div>
//     </>
//   );
// }
"use client";
import { Button, Header, Heading } from "ui";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

const VIEW_STUDNETS = gql`
  query getAllStudents {
    getAllStudents {
      firstName
    }
  }
`;

const CreateBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [createBook] = useMutation(CREATE_BOOK);
  const { data } = useSuspenseQuery(VIEW_STUDNETS);
  console.log(data);

  const handleCreateBook = async () => {
    try {
      const { data } = await createBook({
        variables: { title, author },
      });
      console.log("New book created:", data.createBook);
      // Optionally, you can navigate to a different page or update the UI here.
    } catch (error) {
      console.error("Error creating book:", error);
      // Handle the error and display an error message to the user if necessary.
    }
  };

  return (
    <div>
      <h2>Create a New Book</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button onClick={handleCreateBook}>Create Book</button>
    </div>
  );
};

export default CreateBookForm;
