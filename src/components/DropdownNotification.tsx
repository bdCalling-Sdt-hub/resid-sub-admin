import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import baseAxios from '../../Config';
import 'react-responsive-modal/styles.css';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo") || '{}');
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(notifications);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // /api/notifications // get all notifications use effect
  useEffect(() => {
    baseAxios.get(`/api/notifications`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data.data.attributes);
        setNotifications(res.data.data.attributes);
      })
      .catch((error) => {
        console.log(error);
        if (
          "You are not authorised to sign in now" === error?.response?.data?.message || "Error authorization" === error?.response?.data?.message
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("yourInfo");
        }
      })
  }, [setNotifications]);


  useEffect(() => {
    // Connect to server using socket.io-client
    var socket = io("http://159.65.18.179:3000");

    socket.on("connect", () => {
      // Emit events or listen for events here
      socket.on("admin-notification", (data): any => {
        console.log(data);
        setNotifications(data);
      });
      // socket.off("admin-notification", data);
    });
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });


  function getTimeAgo(timestamp: any) {
    const now = new Date();
    const date = new Date(timestamp);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
  }

  const notificationUpdateHandler = (id: string, linkId: string) => {
    let token = localStorage.getItem("token");
    baseAxios
      .patch(
        `/api/notifications/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // setModalData(res.data.data);
        // setIsModalOpen(true);
        // dispatch(NotificationsData(data));
      })
      .catch((err) => console.log(err));

    navigate(`/residence/${linkId}`)
    window.location.reload();
  };


  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {notifications?.notViewed > 0 && (
          <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}


        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications?.allNotification?.map((item: any) => (
            <>
              <li
                className='cursor-pointer'
                key={item._id}
                onClick={() => notificationUpdateHandler(item._id, item.linkId)}
              >

                <div
                  className={`flex flex-col gap-2.5 border-t ${!item.viewStatus && 'bg-meta-1 text-wi hover:bg-meta-3'}  border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4`}

                >
                  <p className="text-sm">
                    <span className={`${!item.viewStatus && 'text-white'} text-black dark:text-white`}>
                      {item?.message}
                    </span>
                  </p>

                  <p className={`${!item.viewStatus && 'text-white'} text-xs`}>{getTimeAgo(item.createdAt)}</p>
                </div>
              </li>
            </>
          ))
          }

        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
