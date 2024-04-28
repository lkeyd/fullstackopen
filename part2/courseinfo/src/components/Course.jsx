import React from "react";

export default function Course({ course }) {
  let total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name}: {part.exercises}
          </p>
        );
      })}
      <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
    </div>
  );
}
