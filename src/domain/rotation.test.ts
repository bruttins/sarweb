import { describe, test, expect } from "vitest";
import { createRotation } from "./rotation";

describe("4-participant rotation", () => {
    test("4-participant rotation is valid", () => {
        // ARRANGE
        const names = ["lisa", "toby", "matty", "reto"];

        // ACT
        const rounds = createRotation(names);

        // ASSERT
        // rounds has 4 rounds
        expect(rounds).toHaveLength(4);

        // FOR each name in names: count how many times name appears as trainee across all rounds
        // expect count to be 1
        for (const name of names) {
            const traineeCount = rounds.filter((round) => round.trainee === name).length;
            expect(traineeCount).toBe(1);
        }

        // FOR each round in rounds: expect round has helper1, helper2, trainee, observer
        for (const round of rounds) {
            expect(round).toHaveProperty("helper1");
            expect(round).toHaveProperty("helper2");
            expect(round).toHaveProperty("trainee");
            expect(round).toHaveProperty("observer");
        }

        // FOR each name in names: count how many times name appears in each role across all rounds
        // expect each role count to be <= 3
        for (const name of names) {
            const helper1Count = rounds.filter((round) => round.helper1 === name).length;
            const helper2Count = rounds.filter((round) => round.helper2 === name).length;
            const traineeCount = rounds.filter((round) => round.trainee === name).length;
            const observerCount = rounds.filter((round) => round.observer === name).length;

            expect(helper1Count).toBeLessThanOrEqual(3);
            expect(helper2Count).toBeLessThanOrEqual(3);
            expect(traineeCount).toBeLessThanOrEqual(3);
            expect(observerCount).toBeLessThanOrEqual(3);
        }
    });
});

describe("5-7 participant rotation", () => {
    test("5-participant rotation produces valid schedule", () => {
        // ARRANGE
        const names = ["alice", "bob", "charlie", "diana", "eve"];

        // ACT
        const rounds = createRotation(names);

        // ASSERT
        expect(rounds).toHaveLength(5);

        // Each round has all required properties
        for (const round of rounds) {
            expect(round).toHaveProperty("helper1");
            expect(round).toHaveProperty("helper2");
            expect(round).toHaveProperty("trainee");
            expect(round).toHaveProperty("observer");
        }

        // Each participant is trainee exactly once
        for (const name of names) {
            const traineeCount = rounds.filter((round) => round.trainee === name).length;
            expect(traineeCount).toBe(1);
        }
    });

    test("6-participant rotation produces valid schedule", () => {
        // ARRANGE
        const names = ["alice", "bob", "charlie", "diana", "eve", "frank"];

        // ACT
        const rounds = createRotation(names);

        // ASSERT
        expect(rounds).toHaveLength(6);

        // Each round has all required properties
        for (const round of rounds) {
            expect(round).toHaveProperty("helper1");
            expect(round).toHaveProperty("helper2");
            expect(round).toHaveProperty("trainee");
            expect(round).toHaveProperty("observer");
        }

        // Each participant is trainee exactly once
        for (const name of names) {
            const traineeCount = rounds.filter((round) => round.trainee === name).length;
            expect(traineeCount).toBe(1);
        }
    });

    test("7-participant rotation produces valid schedule", () => {
        // ARRANGE
        const names = ["alice", "bob", "charlie", "diana", "eve", "frank", "grace"];

        // ACT
        const rounds = createRotation(names);

        // ASSERT
        expect(rounds).toHaveLength(7);

        // Each round has all required properties
        for (const round of rounds) {
            expect(round).toHaveProperty("helper1");
            expect(round).toHaveProperty("helper2");
            expect(round).toHaveProperty("trainee");
            expect(round).toHaveProperty("observer");
        }

        // Each participant is trainee exactly once
        for (const name of names) {
            const traineeCount = rounds.filter((round) => round.trainee === name).length;
            expect(traineeCount).toBe(1);
        }
    });
});