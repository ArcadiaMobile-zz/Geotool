interface BaseSearchBindingResult {
    Title: string;
    Url: string;
    Description: string;
}

interface BaseSearchBindingResults {
    Results: BaseSearchBindingResult[];
}