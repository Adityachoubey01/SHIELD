# SHIELD

This is a Next.js starter project.

## Running the Development Server

To run the app locally, use the following command:

```bash
npm run dev
```

This will start the development server, typically on `http://localhost:3000`.

### Customizing the Port

If you want to run the app on a different port, you can set the `PORT` environment variable before running the command. For example, to run on port `8080`:

```bash
PORT=8080 npm run dev
```

## Accessing Your Code on Another System

To work on this project from another computer, you can use Git to push your code to a remote repository service like GitHub, GitLab, or Bitbucket.

### One-Time Setup

1.  **Create a new repository** on your preferred service (e.g., [new GitHub repo](https://github.com/new)). Make it private if you don't want it to be public.

2.  **Initialize Git and push your code**. In the terminal of your current coding environment, run the following commands. Replace `<your-repository-url>` with the URL from the repository you just created.

    ```bash
    # Initialize a new Git repository
    git init

    # Add all your files to be tracked by Git
    git add .

    # Create your first commit
    git commit -m "Initial commit"

    # Add the remote repository URL
    git remote add origin <your-repository-url>

    # Push your code to the remote repository
    git push -u origin main
    ```

### On Your Other System

1.  **Clone the repository**. Open a terminal on your other computer and run:

    ```bash
    git clone <your-repository-url>
    ```

2.  **Install dependencies**. Navigate into your new project folder and install the necessary packages.

    ```bash
    cd <your-project-name>
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

Now your project is set up on your other system. You can use `git push` to save changes from one machine and `git pull` to get those changes on another.
