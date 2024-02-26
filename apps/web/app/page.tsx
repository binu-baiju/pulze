"use client";

// import { useMutation, useQuery, gql } from "@apollo/client";
import { log } from "console";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

// const VIEW_STUDNETS = gql`
//   query students {
//     students {
//       id
//       firstName
//       lastName
//       age
//     }
//   }
// `;

// type Student = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age: number;
// };

// const CREATE_STUDENT = gql`
//   mutation CreateStudent($firstName: String!, $lastName: String!, $age: Int!) {
//     createStudent(firstName: $firstName, lastName: $lastName, age: $age) {
//       firstName
//     }
//   }
// `;

// const DELETE_STUDENT = gql`
//   mutation DeleteStudent($id: Int!) {
//     deleteStudent(id: $id) {
//       id
//     }
//   }
// `;

// const UPDATE_FIRST_NAME = gql`
//   mutation UpdateFirstName($id: Int!, $firstName: String!) {
//     updateStudent(id: $id, firstName: $firstName) {
//       id
//       firstName
//     }
//   }
// `;

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  const [newFirstName, setNewFirstName] = useState("");

  // const [createStudent, { data: returnData, loading, error }] =
  //   useMutation(CREATE_STUDENT);
  // const [deleteStudent] = useMutation(DELETE_STUDENT);
  // const [updateFirstName] = useMutation(UPDATE_FIRST_NAME);

  // const { data, refetch } = useQuery<{ students: Student[] }>(VIEW_STUDNETS);
  // const students = data?.students || [];

  // const handlecreateStudent = async () => {
  //   try {
  //     createStudent({
  //       variables: { firstName, lastName, age: +age },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDeleteStudent = async (id: number) => {
  //   try {
  //     const { data } = await deleteStudent({ variables: { id } });

  //     if (data?.deleteStudent) {
  //       // Deletion was successful, handle UI updates as needed
  //       refetch();
  //     } else {
  //       console.error("Failed to delete student.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //   }
  // };

  // const handleUpdateFirstName = async () => {
  //   try {
  //     const { data } = await updateFirstName({
  //       variables: { id: +id, firstName: newFirstName },
  //     });
  //     if (data?.deleteStudent) {
  //       // Deletion was successful, handle UI updates as needed
  //       refetch();
  //     } else {
  //       console.error("Failed to delete student.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating student:", error);
  //   }
  // };

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <h1>Hello</h1>
    // <div className="flex">
    //   <div className="p-16 flex flex-col gap-6 w-1/3">
    //     <h2>Create a New Student</h2>
    //     <div>
    //       <label>FirstName:</label>
    //       <input
    //         className="h-8 bg-slate-200 rounded-md ms-4"
    //         type="text"
    //         value={firstName}
    //         onChange={(e) => setFirstName(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label>LastName:</label>
    //       <input
    //         className="h-8 bg-slate-200 rounded-md ms-4"
    //         type="text"
    //         value={lastName}
    //         onChange={(e) => setLastName(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label>Age:</label>
    //       <input
    //         className="h-8 bg-slate-200 rounded-md ms-4"
    //         type="text"
    //         value={age}
    //         onChange={(e) => setAge(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       className="bg-black text-white p-3 rounded-md"
    //       onClick={handlecreateStudent}
    //     >
    //       {loading ? "Saving" : "Create Book"}
    //     </button>
    //   </div>
    //   <div className="p-16 flex flex-col gap-6 w-1/3">
    //     <h2>Update Student</h2>
    //     <div>
    //       <label>Student ID:</label>
    //       <input
    //         className="h-8 bg-slate-200 rounded-md ms-4"
    //         type="number"
    //         value={id}
    //         onChange={(e) => setId(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label>New First Name:</label>
    //       <input
    //         className="h-8 bg-slate-200 rounded-md ms-4"
    //         type="text"
    //         value={newFirstName}
    //         onChange={(e) => setNewFirstName(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       className="bg-black text-white p-3 rounded-md"
    //       onClick={handleUpdateFirstName}
    //     >
    //       Update First Name
    //     </button>
    //   </div>

    //   <div className="p-16 flex flex-col gap-6 w-1/3">
    //     <h1 className="text-2xl">All students</h1>
    //     {students.map((student, index) => (
    //       <div className="flex gap-3 items-center" key={index}>
    //         <h2>{index + 1}.</h2>
    //         <h2>
    //           {student.firstName} {student.lastName}
    //         </h2>
    //         <p>Age: {student.age}</p>
    //         <button
    //           onClick={() => handleDeleteStudent(student.id)}
    //           className="bg-red-600 p-1 rounded-lg text-white"
    //         >
    //           delete
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Page;
