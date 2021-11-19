import React, { PureComponent } from 'react'
import inEU from '@brewdigital/in-eu'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled<{ backgroundColor: string; textColor: string; inEU: boolean }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 25px 75px;
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: 15px center;
  z-index: 151;
  background-image: ${props =>
    props.inEU
      ? 'url("https://static.adaptavistassets.com/cookie-star-navy.svg")'
      : 'url("https://static.adaptavistassets.com/cookie-star-grey.svg")'};
  background-color: ${props => (props.inEU ? 'white' : props.backgroundColor)};
`

const Content = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 56rem) {
    flex-direction: column;
  }

  a {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`

const P = styled('p')`
  margin: 0;
  font-family: 'Museo Sans', system-ui, serif;
  line-height: 1.6;
  font-size: 16px;
  text-align: left;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const CloseButton = styled<{ backgroundColor: string; inEU: boolean }, 'button'>('button')`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  border: none;
  background: none;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  color: ${props => (props.inEU ? props.backgroundColor : 'inherit')};
`

const ActionButton = styled('button')`
  border-radius: 100px;
  background: white;
  padding: 6px 14px;
  color: #010a27;
  text-decoration: none;
  font-weight: 500;
`

const ActionButtonAccept = styled<{ inEU: boolean }, 'button'>('button')`
  border-radius: 100px;
  padding: 6px 14px;
  text-decoration: none;
  font-weight: 500;
  background-color: ${props => (props.inEU ? '#4775FF' : 'white')};
  color: ${props => (props.inEU ? 'white' : '#010a27')};
`

const LeftCol = styled<{ backgroundColor: string; inEU: boolean }, 'div'>('div')`
  flex: 1;
  color: ${props => (props.inEU ? props.backgroundColor : 'white')};
  a,
  button {
    color: ${props => (props.inEU ? '#0033CD' : 'white')};
  }
`

const RightCol = styled('div')`
  margin-left: 15px;

  @media (max-width: 56rem) {
    margin-left: 0;
    margin-top: 10px;
  }
`

const Overlay = styled('div')`
  background-color: black;
  width: 100%;
  height: 100vh;
  position: fixed;
  opacity: 0.75;
  left: 0;
  top: 0;
`

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onClose: () => void
  onChangePreferences: () => void
  onAcceptAll: () => void
  onDenyAll: () => void
  showAcceptAllButton: boolean
  showDenyAllButton: boolean
  content: React.ReactNode
  subContent: React.ReactNode
  backgroundColor: string
  textColor: string
  hideOverlay: boolean
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onClose,
      onChangePreferences,
      onAcceptAll,
      onDenyAll,
      showAcceptAllButton,
      showDenyAllButton,
      content,
      subContent,
      backgroundColor,
      textColor,
      hideOverlay
    } = this.props

    return (
      <>
        <Root
          className="cb-container"
          innerRef={innerRef}
          backgroundColor={backgroundColor}
          textColor={textColor}
          inEU={inEU()}
        >
          <Content className="cb-content">
            <LeftCol className="cb-description" backgroundColor={backgroundColor} inEU={inEU()}>
              <P>{content}</P>
            </LeftCol>

            {(showAcceptAllButton || showDenyAllButton) && (
              <RightCol>
                {showAcceptAllButton && (
                  <ActionButtonAccept
                    className="cb-accept-all-btn"
                    onClick={onAcceptAll}
                    inEU={inEU()}
                  >
                    Accept all cookies
                  </ActionButtonAccept>
                )}
                {showDenyAllButton && (
                  <ActionButton className="cb-deny-all-btn" onClick={onDenyAll}>
                    Deny all cookies
                  </ActionButton>
                )}
              </RightCol>
            )}

            <P hidden>
              <button type="button" onClick={onChangePreferences}>
                {subContent}
              </button>
            </P>
          </Content>

          <CloseButton
            type="button"
            className="cb-close-btn"
            title="Close"
            aria-label="Close"
            onClick={onClose}
            backgroundColor={backgroundColor}
            inEU={inEU()}
          >
            <span dangerouslySetInnerHTML={{ __html: '&#10005;' }} />
          </CloseButton>
        </Root>
        {!hideOverlay && <Overlay className="cb-overlay" />}
      </>
    )
  }
}
