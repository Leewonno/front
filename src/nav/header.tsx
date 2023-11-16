import styles from "../css/header.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket,faUser,faBasketShopping  } from "@fortawesome/free-solid-svg-icons";

export default function Header() {

    const [openMenu, setOpenMenu] = useState(false);

    const onClick = () => {
        setOpenMenu(true);
    };

    const onClick2 = () => {
        setOpenMenu(false);
    }


    return (
        <div className={styles.container}>
            {openMenu ? <div className={styles.wrapper} onClick={onClick2}>Demure
                <div className={styles.menu} onClick={(e) => {e.stopPropagation()}}>
                    <input placeholder="검색"/>
                    <dt>shop
                        <dd>
                            의자
                        </dd>
                        <dd>
                            책상
                        </dd>
                    </dt>
                    <dt>customer service
                        <dd>
                            q&a
                        </dd>
                        <dd>
                            문의
                        </dd>
                    </dt>
                    <dt>event</dt>
                </div>
            </div> : <div className={styles.main} onClick={onClick}>Demure</div>}
                <div>
                    <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#ffffff" }} />
                    Bonjour!
                </div>
                <div>
                    <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faBasketShopping} style={{color: "#ffffff",}} />
                </div>
        </div>
    )
}