if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  const DumpAll = () => {
    const globals = Object.getOwnPropertyNames(window);
    const functions = [];
    const variables = [];

    globals.forEach((name) => {
      try {
        if (typeof window[name] === "function") {
          functions.push(name);
        } else {
          variables.push(name);
        }
      } catch (e) {
        console.error(
          `Skipping inaccessible object ${name} because of error.`,
          e
        );
      }
    });

    return { functions, variables };
  };

  console.log(DumpAll());
}
