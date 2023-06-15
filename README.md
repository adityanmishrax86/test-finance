# Finance Tracker

## Frontend 

## Backend

## Deployment


## Checklist 
 - Master branch is <b>Main</b> , Create new branch and create PR to Main branch only
 - For frontend related changes add to frontend directory
 - For backend related changes add to backend directory
 - For deployment related changes add to deployment directory
 - Please update all the steps required to deploy or access the application frontend or backend locally for debug purpose
 - In Deployment we can show how to setup for live dev env on the web
 - 

 ## Commit message
 Branch Naming Convention

The Git Branching Naming Convention article is an excellent base.
However, you can simplify even more.

Category

A git branch should start with a category. Pick one of these: feature, bugfix, hotfix, or test.

    feature is for adding, refactoring or removing a feature
    bugfix is for fixing a bug
    hotfix is for changing code with a temporary solution and/or without following the usual process (usually because of an emergency)
    test is for experimenting outside of an issue/ticket

Reference

After the category, there should be a "/" followed by the reference of the issue/ticket you are working on. If there's no reference, just add no-ref.

Description

After the reference, there should be another "/" followed by a description which sums up the purpose of this specific branch. This description should be short and "kebab-cased".

By default, you can use the title of the issue/ticket you are working on. Just replace any special character by "-".

To sum up, follow this pattern when branching:

git branch <category/reference/description-in-kebab-case>

Examples:

    You need to add, refactor or remove a feature: git branch feature/issue-42/create-new-button-component
    You need to fix a bug: git branch bugfix/issue-342/button-overlap-form-on-mobile
    You need to fix a bug really fast (possibly with a temporary solution): git branch hotfix/no-ref/registration-form-not-working
    You need to experiment outside of an issue/ticket: git branch test/no-ref/refactor-components-with-atomic-design
