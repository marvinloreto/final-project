set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"date" DATE NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exercises" (
	"workoutId" serial NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"target" TEXT NOT NULL,
  "sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"notes" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "exercises_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorites" (
	"favoriteId" serial NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"exerciseId" integer NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "favorites_pk" PRIMARY KEY ("favoriteId")
) WITH (
  OIDS=FALSE
);







ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
