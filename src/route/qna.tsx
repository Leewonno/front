import styles from "../css/qna.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";


function OneQna({ que, anw }: { que: string, anw: string }) {
    const [visible, setVisible] = useState<boolean>(true);

    return (
        visible ?
            (<div className={styles.qnaBox}>
                <div>{que}</div>
                <div className={styles.qnaBtn}>
                    <FontAwesomeIcon icon={faCaretDown} onClick={() => setVisible(false)} />
                </div>
            </div >) :

            (<div className={styles.qnaBox2Wrapper}>
                <div className={styles.qnaBox2}>
                    <div>{que}</div>
                    <div className={styles.qnaBtn}><FontAwesomeIcon icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                </div>
                <div className={styles.qnaInfor}>
                    {anw}
                </div>
            </div>)
    )
}

function InquireOpen({ comment }: { comment: any }) {
    const [visible, setVisible] = useState<boolean>(true);
    const [Answer, setAnswer] = useState<string>("")
    const [cookies, setCookies] = useCookies(["NID"])
    const isAdmin = !!cookies.NID;

    const Delete = () => {
        const deleteComment = async () => {
            if (!confirm('댓글을 삭제하시겠습니까?')) {
                return;
            }
            const res = await axios({
                method: "delete",
                url: "http://localhost:8000/question/delete",
                data: {
                    id: comment.id
                }
            })
            if (res.data.result) {
                document.location.reload();
            }
        }
        deleteComment();
    };

    const registerAnswer = async (comment : any) => {
        
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/question/answer",
            data: {
                question_id:comment.id,
                content:Answer
            }
        })
        if (res.data.result) {
            document.location.reload();
        }
    }

    return (
        visible ?
            (<div className={styles.inquireBox} onClick={() => setVisible(false)}>
                <div className={styles.inquireResponse}>답변대기</div>
                <div className={styles.inquireTitle}>{comment.title}</div>
            </div>) :

            (<div className={styles.inquireMainBox}>
                <div className={styles.inquireMainHeader}>
                    <div className={styles.inquireMainTitle}>{comment.title}</div>
                    <div className={styles.inquireMainBtnWrapper}>
                        <button className={styles.inquireMainPatch}>수정</button>
                        <button className={styles.inquireMainBtnDelete} onClick={Delete}>삭제</button>
                        <div><FontAwesomeIcon className={styles.inquireMainBtnOff} icon={faCaretUp} onClick={() => setVisible(true)} /></div>
                    </div>
                </div>
                <div className={styles.inquireMainContent}>{comment.content}</div>
                <br />
                {isAdmin && <textarea className={styles.inquireMainAnswer} onChange={e => {setAnswer(e.target.value)}}></textarea>}
                <div className={styles.inquirMainBtnWrapper}>
                    <button className={styles.inquireMainBtn} onClick={() => registerAnswer(comment)}>답글등록</button>
                </div>
            </div>)
    )
}


export default function QnA() {
    const [comments, setComments] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [secret, setSecret] = useState<boolean>(false);

    useEffect(() => {
        const datas = async () => {
            const res = await axios({
                method: "get",
                url: 'http://localhost:8000/question/load',
            })
            setComments(res.data);
        }
        datas();
        console.log(comments)
    }, []);

    const register = async () =>  {
        
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/question/write",
            data: {
                title,
                content,
                secret,
                user_id:1
            }
        })
        if (res.data.result) {
            document.location.reload();
        }
    };

   

    return (
        <>
            <div className={styles.qnaContainer}>
                <section className={styles.qnaSection}>
                    <div className={styles.qnaWrapper}>
                        <div className={styles.qnaTitle}>QnA</div>
                        <div className={styles.qnaName}>자주 묻는 질문</div>
                        <OneQna que="배송은 언제 오나요?" anw="배송은 주문 일 기준으로 이틀 뒤 발송시작되며 배송이 시작 된 이후로는 택배사에 문의하셔야 합니다." />
                        <OneQna que="상품을 교환/반품하고 싶어요." anw="알아서 하십쇼." />
                        <OneQna que="교환/반품을 철회하고 싶어요." anw="알아서 하십쇼." />
                        <OneQna que="회원탈퇴는 어떻게 하나요?" anw="불가합니다." />
                        <OneQna que="배송 받은 상품이 파손되었어요." anw="알아서 하십쇼." />
                    </div>
                    <div className={styles.inquireWrapper}>
                        <div className={styles.inquireHeaderTitle}>1:1 문의</div>
                        <input placeholder="검색" className={styles.inquireSearch} />
                        {comments.map((comment, index) => {
                            return (
                                <InquireOpen key={index} comment={comment} />
                            )
                        })}
                        <div className={styles.answerBox}>
                            <div className={styles.answerTitle}>문의하기</div>
                            <textarea className={styles.answerMainName} placeholder="제목" onChange={e => {setTitle(e.target.value)}}></textarea>
                            <textarea className={styles.answerMain} placeholder="문의내용" onChange={e => {setContent(e.target.value)}}></textarea>
                            <div className={styles.answerBtnWrapper}>
                                <input className={styles.answerCheck} type="checkbox" onChange={e => {setSecret(e.target.checked)}}/>
                                <div className={styles.answerSecret}>비밀글</div>
                                <button className={styles.answerRegisterBtn} onClick={register}>등록</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )

}