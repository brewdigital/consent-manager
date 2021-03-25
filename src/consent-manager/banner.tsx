import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 25px 75px;
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  background-color: ${props => props.backgroundColor};
  background-image: url('https://static.adaptavistassets.com/cookie-star-grey.svg');
  background-repeat: no-repeat;
  background-position: 15px center;
`

const Content = styled('div')`
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

const CloseButton = styled('button')`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`

const ActionButton = styled('button')`
  border-radius: 100px;
  background: white;
  padding: 6px 14px;
  color: #010a27;
  text-decoration: none;
  font-weight: 500;
  margin-top: 5px;
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
      textColor
    } = this.props

    return (
      <Root innerRef={innerRef} backgroundColor={backgroundColor} textColor={textColor}>
        <Content>
          <P>{content}</P>

          {showAcceptAllButton && (
            <ActionButton onClick={onAcceptAll}>Accept all cookies</ActionButton>
          )}
          {showDenyAllButton && <ActionButton onClick={onDenyAll}>Deny all cookies</ActionButton>}

          <P hidden>
            <button type="button" onClick={onChangePreferences}>
              {subContent}
            </button>
          </P>
        </Content>

        <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
          ✕
        </CloseButton>
      </Root>
    )
  }
}
