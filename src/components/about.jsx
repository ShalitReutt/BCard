const About = () => {
  return (
    <>
      <h1 className="display-2">About</h1>
      <p style={{ fontSize: "3vmin" }}>
        here you can find some information about the site and his maker
      </p>
      <hr />
      <div>
        <div>
          <h2>What is BCard?</h2>
          <p className="about-p">
            BCard is platform where users can find information about businesses
            and how to contact them. if you have a your own business, you can
            create a "Business Account" and add your own business card.
          </p>
          <p className="about-p">
            You can create new business cards and find the business cards you've
            already created in the "My-Cards" page.
          </p>
        </div>
        <div>
          <h2>Business Cards</h2>
          <p className="about-p">
            The Business Cards are our way of presenting information about
            various businesses.
          </p>
          <p className="about-p">
            Clicking on the image of a business card will send you to a page
            where you can find some more information about it.
          </p>
          <p className="about-p">
            Registered users can like cards that they are interested in and add
            them to favorites. you can find the liked cards later in the
            "Favorite-Cards" page.
          </p>
        </div>
        <hr />
        <div>
          <p className="about-p">
            The Webside was created by Lars Shalit in 2023. all the right
            reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
