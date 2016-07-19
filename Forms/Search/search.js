window.onload = function() {

    var searchForm = document.getElementById("searchForm");
    var searchQueryInput = searchForm.searchQuery;

    searchQueryInput.addEventListener("keyup", function(event) {
        if (!(validator.isTrimmed(searchQueryInput.value))) {
            searchQueryInput.setCustomValidity("Search query should not have leading or trailing spaces. Please remove =)");
        } else if (!(validator.isOfLength(searchQueryInput.value, 3) && validator.isLength(searchQueryInput.value, 25))) {
            searchQueryInput.setCustomValidity("A search query should be longer than 3 characters and less than 25 characters =)");
        } else {
            searchQueryInput.setCustomValidity("")
        }
    });
    
}
