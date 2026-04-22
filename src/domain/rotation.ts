
export interface Round {
    helper1: string;
    helper2: string;
    trainee: string;
    observer: string;
    idle?: string[];
}

export function createRotation(names: string[]): Round[] {
    if (names.length === 4) {
        return createRotation4(names);
    } else if (names.length >= 5 && names.length <= 7) {
        return createRotation5to7(names);
    }
    throw new Error(`Invalid number of participants: ${names.length}`);
}

function createRotation4(names: string[]): Round[] {
    const rounds: Round[] = []

	let current_helper1 = names[0];
	let current_helper2 = names[1];
	let current_observer = names[2];
	let current_trainee = names[3];

    rounds.push(createRound(current_helper1, current_helper2, current_observer, current_trainee))

	for (let i=1; i<names.length; i++) {
        const tempHelper1 = current_helper1;
        current_helper1 = current_helper2;
		current_helper2 = current_observer;
		current_observer = current_trainee;
		current_trainee = tempHelper1;
    	rounds.push(createRound(current_helper1, current_helper2, current_observer, current_trainee));
    }

    return rounds;
}

function createRotation5to7(names: string[]): Round[] {
    const rounds: Round[] = [];

    let currentHelper1 = names[0];
    let currentHelper2 = names[1];
    let currentObserver = names[2];
    let currentTrainee = names[3];
    const idle = [...names.slice(4)]; // Copy remaining names as idle queue

    rounds.push(createRound(currentHelper1, currentHelper2, currentObserver, currentTrainee, idle));

    for (let i = 1; i < names.length; i++) {
        if (i === 1 || i === 3 || i === 5 || i === 7) {
            // Rotate: helper1 -> idle, observer -> helper1, trainee -> observer, idle[0] -> trainee
            idle.push(currentHelper1);
            currentHelper1 = currentObserver;
            currentObserver = currentTrainee;
            currentTrainee = idle.shift()!;
        } else {
            // Rotate: helper2 -> idle, trainee -> helper2, idle[0] -> trainee
            idle.push(currentHelper2);
            currentHelper2 = currentTrainee;
            currentTrainee = idle.shift()!;
        }

        rounds.push(createRound(currentHelper1, currentHelper2, currentObserver, currentTrainee, idle));
    }

    return rounds;
}

function createRound(fig1: string, fig2: string, obs: string, trainee: string, idle: string[] = []): Round {
	return {
		helper1: fig1,
		helper2: fig2,
		trainee: trainee,
        observer: obs,
        idle: [...idle],
		};
}
