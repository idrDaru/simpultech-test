class MessagesController < ApplicationController
  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.create(message_params)
    if @message.persisted?
      room_with_messages = @room.as_json(include: :messages)
      ActionCable.server.broadcast("chat", room_with_messages)
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def message_params
      params.require(:room).permit(:message)
    end
end
