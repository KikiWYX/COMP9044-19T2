#!/bin/bash

legitdir='.legit'
sub_legitdir='.git'
fullpath="$legitdir/$sub_legitdir"
indexdir="objects"


# Sub-function to generate the instructions
# output the correct instructions when the user input wrong parameter

error()
{
    echo "Usage: legit.pl <command> [<args>]";
    echo "These are the legit commands:";
    echo "   init       Create an empty legit repository";
    echo "   add        Add file contents to the index";
    echo "   commit     Record changes to the repository";
    echo "   log        Show commit log";
    echo "   show       Show file at particular state";
    echo "   rm         Remove files from the current directory and from the index";
    echo "   status     Show the status of files in the current directory, index, and repository";
    echo "   branch     list, create or delete a branch";
    echo "   checkout   Switch branches or restore current directory files";
    echo "   merge      Join two development histories together";
    exit 1;
}

# Subset 0
# function 1 inti
# initial the implicit folder ".legit/.git"

init() {
    if test -e  $legitdir
    then 
        echo "$0: error: $legitdir already exists"
    else
        mkdir "$legitdir"
        mkdir "$legitdir/$sub_legitdir"
        echo "Initialized empty legit repository in .legit"
    fi
}

pp() {
echo "asdasdasdas"
}


#Subset 0
# function add
# adds the contents of one or more files to the "index"

add() 
{
    if test -e  $legitdir
    then
        if !( test -e "$fullpath/$indexdir" )
        then
            mkdir "$fullpath/$indexdir"
            echo "$indexdir created"
        fi 
        for file in ${@:2}
        do  
            if !( test -e "$file" )
            then
                echo "legit-add: error: can not open '$file'"
                continue
            elif [[ $file =~ [^a-zA-Z0-9\.\_\-] || $file =~ ^[^a-zA-Z0-9] ]]
            then
              echo "legit-add: error: invalid filename '$file'"
              continue 
            else
                cp "$file" "$fullpath/$indexdir"
            fi 
        done
    else
        echo  "legit.pl: error: no $legitdir directory containing legit repository exists"
        exit 1
    fi
}



case "$1" in 
    "add" ) add $@;;
    "pp" ) pp ;;
    "init" ) init ;;
    *) error ;;
esac




                
                





