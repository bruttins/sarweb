import * as readline from 'readline';
import { processNames } from "../domain/names";
import { createRotation } from "../domain/rotation";
import type { Round } from "../domain/rotation";

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter names (comma-separated): ", (input: string) => {
        const result = processNames(input);

        if (result.ok) {
            try {
                const rounds: Round[] = createRotation(result.names);
                console.log("\nRotation Schedule:");

                // Calculate column widths
                const headers = ['Round', 'Helper 1', 'Helper 2', 'Trainee', 'Observer'];
                const colWidths = headers.map(header => header.length);

                rounds.forEach((round, index) => {
                    const row = [
                        (index + 1).toString(),
                        round.helper1,
                        round.helper2,
                        round.trainee,
                        round.observer
                    ];
                    row.forEach((cell, i) => {
                        colWidths[i] = Math.max(colWidths[i], cell.length);
                    });
                });

                // Print header
                const headerLine = headers.map((header, i) => header.padEnd(colWidths[i])).join(' | ');
                const separator = colWidths.map(width => '-'.repeat(width)).join('-+-');
                console.log(headerLine);
                console.log(separator);

                // Print rows
                rounds.forEach((round, index) => {
                    const row = [
                        (index + 1).toString(),
                        round.helper1,
                        round.helper2,
                        round.trainee,
                        round.observer
                    ];
                    const rowLine = row.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ');
                    console.log(rowLine);
                });
            } catch (error: unknown) {
                console.log("Error creating rotation:", error instanceof Error ? error.message : String(error));
            }
        } else {
            console.log("Error:", result.error);
        }

        rl.close();
    });
}

main();