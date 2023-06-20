import React from "react";

const injectFbSDKScript = () => {
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};

const useInitFbSDK = () => {
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Initializes the SDK once the script has been loaded
    // https://developers.facebook.com/docs/javascript/quickstart/#loading
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: "593957432708717",
            cookie: true,
            xfbml: true,
            version: "v8.0",
        });

        window.FB.AppEvents.logPageView();
        setIsInitialized(true);
    };

    injectFbSDKScript();

    return isInitialized;
};






// You can find your Page ID
// in the "About" section of your page on Facebook.
const PAGE_ID = "116648617991932";

export default function Teste() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();

  // App state
  const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
  const [fbPageAccessToken, setFbPageAccessToken] = React.useState();
  const [postText, setPostText] = React.useState();
  const [isPublishing, setIsPublishing] = React.useState(false);

  // Logs in a Facebook user
  const logInToFB = React.useCallback(() => {
    window.FB.login((response) => {
      setFbUserAccessToken(response.authResponse.accessToken);
    }, { scope: "pages_show_list" });
  }, []);

  // Logs out the current Facebook user
  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
      setFbPageAccessToken(null);
    });
  }, []);

  // Checks if the user is logged in to Facebook
  React.useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [isFbSDKInitialized]);

  // Fetches an access token for the page
  React.useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/me/accounts`,
        "GET",
        (response) => console.log(response)
      );
    }
  }, [fbUserAccessToken]);

  // Publishes a post on the Facebook page
  const sendPostToPage = React.useCallback(() => {
    setIsPublishing(true);

    window.FB.api(
      `/${PAGE_ID}/feed`,
      "POST",
      {
        message: postText,
        access_token: fbPageAccessToken,
      },
      () => {
        setPostText("");
        setIsPublishing(false);
      }
    );
  }, [postText, fbPageAccessToken]);

  // UI with custom styling from ./styles.css`
  return (
    <div id="app" className="grid place-content-center">
      <header id="app-header">
        <p id="logo-text">FB Page API</p>
        {fbUserAccessToken ? (
          <button onClick={logOutOfFB} className="btn confirm-btn border border-red p-8 text-4xl">
            Log out
          </button>
        ) : (
          <button onClick={logInToFB} className="btn confirm-btn border border-black p-8 text-4xl">
            Login with Facebook
          </button>
        )}
      </header>
      <main id="app-main">
        {fbPageAccessToken ? (
          <section className="app-section">
            <h3>Write something to the page</h3>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Message..."
              rows="8"
              disabled={isPublishing}
            />
            <button
              onClick={sendPostToPage}
              className="btn confirm-btn"
              disabled={!postText || isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </section>
        ) : (
          <h2 className="placeholder-container">Welcome!</h2>
        )}
      </main>
    </div>
  );
}
