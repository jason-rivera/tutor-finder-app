function addSearchBar() {    
  $("#navBarCommonBar").after('<form class="form-inline my-2 my-lg-0"><input class="form-control form-control-lg" type="search" placeholder="Search..." style="width: 100%"><a class="btn btn-block btn-primary my-2 my-sm-0 find-button" href="results.html" role="button">Find Tutor <i class="fas fa-search"></i></a></form>');
}


addSearchBar();