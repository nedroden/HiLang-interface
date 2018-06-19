export class SentenceStructureQuestion {
    id: number;
    native: string;
    options: SentenceStructureAnswer[];
}

export class SentenceStructureAnswer {
    id: number;
    value: string;
}
