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
 - if you are changing anything directly in other branch, then do not merge PR to main branch

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
    You need to experiment outside of an issue/ticket: git branch test/no-ref/refactor-components-with-atomic-design.

## Financial data the application will have access to:
   Transactions
   Account Data
   Expenses
   Categories (Sourced from the email and messages)
   Investment Data

## Enumerate the type of questions the user might ask the AI system
 
| SL No | Question | Answer |
| 1 | "How much have I spent on groceries this month?" | "You have spent $450 on groceries this month." |
| 2 | "What's the total amount of income I received last quarter?" | "The total amount of income you received last quarter was $15,000." |
| 3 | "What are my top three spending categories this year?" | "Your top three spending categories this year are housing ($12,000), transportation ($5,000), and groceries ($3,000)." |
| 4 | "What was my highest expense last week?" | "Your highest expense last week was $200 for a car repair." |
| 5 | "Show me a breakdown of my spending by category for the past six months." | "Your spending breakdown by category for the past six months is: Rent - 40%, Groceries - 20%, Transportation - 15%, Dining Out - 10%, Entertainment - 5%, Others - 10%." |
| 6 | "How much interest have I earned on my savings account this year?" | "You have earned $250 in interest on your savings account this year." |
| 7 | "What's the current value of my stock portfolio?" | "The current value of your stock portfolio is $10,000." |
| 8 | "How much did I spend on online shopping in the last three months?" | "You spent $300 on online shopping in the last three months." |
| 9 | "How much money did I save last year compared to the previous one?" | "You saved $2,000 last year, an increase of $500 compared to the previous year." |
| 10 | "What's my average monthly expenditure on utilities like electricity and gas?" | "Your average monthly expenditure on utilities like electricity and gas is $120." |
| 11 | "Did I set any budget for dining out this month?" | "Yes, you have set a budget of $200 for dining out this month." |
| 12 | "How much do I spend on average for transportation each month?" | "On average, you spend $50 on transportation each month." |
| 13 | "How much did I spend on healthcare last year?" | "You spent $800 on healthcare last year." |
| 14 | "What's my projected savings by the end of the year at my current spending rate?" | "Based on your current spending rate, your projected savings by the end of the year would be $3,000." |
| 15 | "What was my biggest investment gain last quarter?" | "Your biggest investment gain last quarter was from ABC stocks, which gained $500 in value." |
| 16 | "What's the ROI on my real estate investments?" | "The ROI on your real estate investments is 5% annually." |
| 17 | . "How much money do I have in my retirement account?" | "You have $50,000 in your retirement account." |
| 18 | "How close am I to my savings goal for this year?" | "You are 75% close to your savings goal for this year." |
| 19 | . "What percentage of my income am I saving each month?" | "You are saving 20% of your income each month." |
| 20 | . "What's the breakdown of my income sources for the last fiscal year?" | "The breakdown of your income sources for the last fiscal year is: Salary - 80%, Investments - 15%, Others - 5%." |
