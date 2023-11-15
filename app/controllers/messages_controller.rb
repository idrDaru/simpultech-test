class MessagesController < ApplicationController
  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.create(message_params)
    if @message.persisted?
      ActionCable.server.broadcast("chat", @message)
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def message_params
      params.require(:message).permit(:message)
    end
end
