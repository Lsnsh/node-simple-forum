# Local:
# https://stackoverflow.com/questions/21151178/shell-script-to-check-if-specified-git-branch-exists
# if the branch is in the local repository.
# return 1 if the branch exists in the local, or 0 if not.
function is_in_local() {
    local branch=${1}
    local existed_in_local=$(git branch --list ${branch} | sed 's/ //g')

    # echo ${#branch} ${#existed_in_local}

    if [[ $branch = $existed_in_local ]]; then
      return 1
    else
      return 0
    fi
}

is_in_local ${1}

if [[ $? == 1 ]]; then
  git checkout publish && git push origin-gitlab publish && git checkout master
else
  git checkout -b publish && git push origin-gitlab publish && git checkout master
fi

