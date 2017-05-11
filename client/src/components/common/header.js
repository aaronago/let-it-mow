import React from 'react';

const Header = () => {
  return (
    <nav>
      <div>
        <tr>
          <td>
            <a href="#"><h1>Let it mow</h1></a>
          </td>
          <td>
            <form>
              <div>
                <input type="text" name="renting" placeholder="What are you renting?" />
                <span class="search-icon"></span>
              </div>
              <div>
                <input type="text" placeholder="Enter a zip code" />
                <span class="location-icon"></span>
              </div>
            </form>
          </td>
          <td>
          <div>
            <a href={'/api/auth/google'}>Login with Google</a>
          </div>
          <div>
            <a href="#">Rent your equipment</a>
          </div>
          </td>
        </tr>
      </div>
    </nav>
  );
};

export default Header;
