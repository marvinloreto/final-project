set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"date" DATE NOT NULL,
	"createdAt" timestamptz(6) NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exercises" (
	"exerciseId" serial NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"target" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorites" (
	"favoriteId" serial NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"exerciseId" integer NOT NULL,
	"createdAt" timestamptz(6) NOT NULL,
	CONSTRAINT "favorites_pk" PRIMARY KEY ("favoriteId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."workoutExercises" (
	"workoutExerciseId" serial NOT NULL,
	"workoutId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"notes" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL,
	CONSTRAINT "workoutExercises_pk" PRIMARY KEY ("workoutExerciseId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId");

ALTER TABLE "workoutExercises" ADD CONSTRAINT "workoutExercises_fk0" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
ALTER TABLE "workoutExercises" ADD CONSTRAINT "workoutExercises_fk1" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId");
