import { styled } from "styled-components";

const font1 = 'Raleway';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const MainContainer = styled.div`
    height: 100vh;
`

export const FeedContainer = styled.div`
    box-sizing: border-box;
    padding-top: 55px;
    margin: auto;
    max-width: 800px;
    border-left: 1px solid #dbdbdb;
    border-right: 1px solid #dbdbdb;
    display: flex;
    flex-direction: column;
`

interface CreateNewPostContainerProps {
    isopened: boolean
}

export const CreateNewPostContainer = styled(FlexContainer)<CreateNewPostContainerProps>`
    align-items: flex-start;
    width: 100%;
    height: ${(props) => props.isopened ? '200px' : '86px'};
    transition: 1s;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
    box-shadow: 0px 2px 2px #00000021;
`

export const CreateNewPostInputContainer = styled(FlexContainer)`
    width: 100%;
    height: 100%;
    padding-right: 20px;
    padding-bottom: 5px;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    justify-content: flex-start;
    flex-direction: column;
`

export const CreateNewPostInput = styled.textarea`
    width: 100%;
    height: 100%;
    background-color: #dbdbdb4e;
    border: 1px solid #5f5f5f4c;
    border-radius: 5px;
    padding: 7px;
    box-sizing: border-box;
    resize: none;
    font-family: ${font1};
    font-size: 1.5em;
    outline: none;

    @media screen and (max-width: 600px) {
        font-size: 1em;
    }
`

export const CreateNewPostInputButtonsContainer = styled(FlexContainer)`
    width: 100%;
    margin-top: 5px;
    justify-content: space-between;
`


export const SelectBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

interface SelectBoxProps {
    isselected: boolean,
}

export const SelectBox = styled.div<SelectBoxProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.isselected ? "white" : "black"};
    color: ${(props) => props.isselected ? "black" : "white"};
    flex: 1;
    height: 30px;
    font-family: ${font1};
    cursor: pointer;
    transition: .6s;

    &:hover {
        background-color: ${props => !props.isselected && 'white'};
        color: ${props => !props.isselected && 'black'};
    }
`





/* Post */

export const PostsContainer = styled.div`
    height: 100%;
`

export const PostContainer = styled.div`
    border-bottom: 1px solid #5f5f5f4c;
    box-sizing: border-box;
    border-radius: 0;
`

export const PostHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`

export const PostHeaderStats = styled.div`
    display: flex;
    flex-direction: column;
`

export const PostHeaderName = styled.span`
    font-family: ${font1};
    padding: 4px;
    color: black;
    font-weight: 600;
`

export const PostHeaderPostTime = styled.span`
    font-size: .7em;
    font-family: ${font1};
    color: gray;
    position: relative;
    top: -4px;
    left: 4px;
`

export const PostContent = styled.p`
    font-size: 1.2em;
    font-family: ${font1};
    padding: 0px 15px;
    padding-bottom: 10px;
`
export const PostLikesBarContainer = styled(FlexContainer)`
    padding: 15px;
    padding-top: 3px;
    padding-bottom: 10px;
    justify-content: flex-start;
`

export const Amount = styled.span`
    color: #000000;
    padding-left: 2px;
    font-size: 1em;
    font-family: ${font1};
    font-weight: 600;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

interface CommentsWrapper {
    isopened: boolean
}

export const CommentsWrapper = styled.div<CommentsWrapper>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 1s;
    max-height: ${(props) => props.isopened ? '600px' : '0'};
`

export const CommentsContainer = styled(FlexContainer)`
    overflow: auto;
    position: relative;
    justify-content: flex-start;
    flex-direction: column;
    border-top: 1px solid #5f5f5f4c;
    background-color: #ecececd8;
    box-shadow: 0px 0px 5px inset #0000004b;
    transition: .3s;
`


export const CommentsTitle = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 2px;
    padding-left: 10px;
    background-color: #242323;
    color: white;
    font-family: ${font1};
    font-weight: bold;
    font-size: 1em;
`

export const CommentWrapper = styled(FlexContainer)`
    width: 98%;
    align-items: flex-start;
    flex-direction: column;
    background-color: white;
    border: 1px solid #5f5f5f4c;
    border-radius: 2px;
    margin: 5px;
`

export const UserReplyContainer = styled(FlexContainer)`
    align-items: flex-start;
    height: 100px;
    transition: 1s;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
    box-shadow: 0px 2px 2px #00000021;
    font-family: ${font1};
`