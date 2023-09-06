"use client";

import { useMutation, useQuery, gql } from "@apollo/client";

import { useState } from "react";

export const dynamic = "force-dynamic";

const VIEW_STUDNETS = gql`
  query students {
    students {
      firstName
      lastName
      age
    }
  }
`;

type Student = {
  firstName: string;
  lastName: string;
  age: number;
};

const CREATE_STUDENT = gql`
  mutation CreateStudent($firstName: String!, $lastName: String!, $age: Int!) {
    createStudent(firstName: $firstName, lastName: $lastName, age: $age) {
      firstName
    }
  }
`;

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const [createStudent, { data: returnData, loading, error }] =
    useMutation(CREATE_STUDENT);

  const { data } = useQuery<{ students: Student[] }>(VIEW_STUDNETS);
  const students = data?.students || [];

  const handlecreateStudent = async () => {
    try {
      createStudent({
        variables: { firstName, lastName, age: +age },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <div className="p-16 flex flex-col gap-6 w-1/3">
        <h2>Create a New Student</h2>
        <div>
          <label>FirstName:</label>
          <input
            className="h-8 bg-slate-200 rounded-md ms-4"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>LastName:</label>
          <input
            className="h-8 bg-slate-200 rounded-md ms-4"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            className="h-8 bg-slate-200 rounded-md ms-4"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button
          className="bg-black text-white p-3 rounded-md"
          onClick={handlecreateStudent}
        >
          {loading ? "Saving" : "Create Book"}
        </button>
      </div>
      <div className="p-16 flex flex-col gap-6 w-1/3">
        <h1 className="text-2xl">All students</h1>
        {students.map((student, index) => (
          <div className="flex gap-3 items-center" key={index}>
            <h2>{index + 1}.</h2>
            <h2>
              {student.firstName} {student.lastName}
            </h2>
            <p>Age: {student.age}</p>
            <button className="bg-red-600 p-1 rounded-lg text-white">
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
